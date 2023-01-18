import torch
import torch.nn as nn
import torch.optim as optim
from torch.nn.utils.rnn import pad_sequence

import time

class SentenceSimilarityModel(nn.Module):
    def __init__(self, vocab, embedding_dim, hidden_dim):
        super(SentenceSimilarityModel, self).__init__()
        self.embedding = nn.Embedding(len(vocab), embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)
        self.linear = nn.Linear(2*hidden_dim, 1)
        
        self.optimizer = optim.Adam(self.parameters())
        self.loss_fn = nn.BCEWithLogitsLoss()

        self.vocab = vocab
        self.vocab_size = len(vocab)
        self.embedding_dim = embedding_dim
        self.hidden_dim = hidden_dim

        self.word_to_index = {str(w): i for i, w in enumerate(vocab)}
        self.index_to_word = {i: str(w) for i, w in enumerate(vocab)}

    def forward(self, sentences1, sentences2):
        embedded_sentences1 = self.embedding(sentences1)
        lstm_out1, _ = self.lstm(embedded_sentences1)
        lstm_out1 = lstm_out1[:, -1, :]
        
        embedded_sentences2 = self.embedding(sentences2)
        lstm_out2, _ = self.lstm(embedded_sentences2)
        lstm_out2 = lstm_out2[:, -1, :]

        if lstm_out1.shape != lstm_out2.shape:
            if lstm_out1.shape[0] < lstm_out2.shape[0]:
                lstm_out1 = torch.nn.functional.pad(lstm_out1, (0,0,0, lstm_out2.shape[0]-lstm_out1.shape[0]))
            else:
                lstm_out2 = torch.nn.functional.pad(lstm_out2, (0,0,0, lstm_out1.shape[0]-lstm_out2.shape[0]))
        
        concatenated = torch.cat((lstm_out1, lstm_out2), dim=1)
        out = self.linear(concatenated)
        return out

    def train(self, sentences1, sentences2, labels, batch_size, epochs):
        sentences1 = [torch.LongTensor([self.word_to_index[str(word)] for word in sentence]) for sentence in sentences1]
        sentences2 = [torch.LongTensor([self.word_to_index[str(word)] for word in sentence]) for sentence in sentences2]

        print(f"Start to Train\tEpoch_Size:\t{epochs}\tBatch_Size:\t{batch_size}")

        for epoch in range(epochs):
            total_loss = .0
            start_time = time.time()

            for i in range(0, len(sentences1), batch_size):
                batch_end = min(i + batch_size, len(sentences1))
                sentence1_batch = pad_sequence(sentences1[i:batch_end], batch_first=True)
                sentence2_batch = pad_sequence(sentences2[i:batch_end], batch_first=True)

                label_batch = torch.tensor(labels[i:batch_end])
                
                out = self.forward(sentence1_batch, sentence2_batch)
                loss = self.loss_fn(out, label_batch)
                total_loss += loss.item()
                
                self.optimizer.zero_grad()
                loss.backward()
                self.optimizer.step()

            end_time = time.time()

            print(f"epoch\t{epoch+1}\tloss:\t{total_loss:.5f}\ttime:\t{end_time-start_time:.5f} sec")

## Word--
class KMeans(nn.Module):
    def __init__(self, embedding_weights, num_clusters):
        super(KMeans, self).__init__()
        self.embedding_weights = embedding_weights
        self.num_clusters = num_clusters
        self.cluster_centers = torch.randn(num_clusters, embedding_weights.size(-1))    
        self.register_buffer('counts', torch.zeros(num_clusters))
    
    def forward(self, x):
        distances = torch.cdist(x, self.cluster_centers)
        _, cluster_assignments = distances.min(dim=-1)
        self.counts.data.zero_()
        self.counts.scatter_add_(0, cluster_assignments.view(-1), torch.ones(x.size(0)))
        for cluster in range(self.num_clusters):
            members = x[cluster_assignments == cluster]
            if members.numel() == 0:
                continue
            self.cluster_centers[cluster] = members.mean(dim=0)
        return self.cluster_centers, self.counts

class KMeansWordSimilarity():
    def __init__(self, model, num_clusters):
        self.embedding_layer = model.embedding
        self.embedding_layer.weight.requiresGrad = False
        self.embedding_weights = self.embedding_layer.weight.data
        self.kmeans = KMeans(embedding_weights=self.embedding_weights, num_clusters=num_clusters)
        
        self.vocab = model.vocab
        self.word_to_index = model.word_to_index
        self.index_to_word = model.index_to_word
        
    def cluster(self):
        self.clusters, self.counts = self.kmeans(self.embedding_weights)
        _, self.word_to_cluster = torch.min(torch.cdist(self.embedding_weights, self.clusters), dim=1)
        self.word_to_cluster = {word: int(cluster) for word, cluster in zip(self.vocab, self.word_to_cluster)}

    def find(self, word, top_k = 5):
        word_embedding = self.embedding_layer(torch.LongTensor([self.word_to_index[word]]))

        cluster = self.word_to_cluster[word]
        cluster_words = [word for word, c in self.word_to_cluster.items() if c == cluster]

        distances = torch.cdist(word_embedding, self.embedding_layer(torch.tensor([self.word_to_index[w] for w in cluster_words])))

        _, closest_words_indices = distances.topk(top_k)
        return [cluster_words[i] for i in closest_words_indices[0]]
