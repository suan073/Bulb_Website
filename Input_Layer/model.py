import torch
import torch.nn as nn
import torch.optim as optim
from torch.nn.utils.rnn import pad_sequence

import time

class SentenceSimilarityModel(nn.Module):
    def __init__(self, vocab, embedding_dim, hidden_dim):
        super(SentenceSimilarityModel, self).__init__()
        self.embedding = nn.Embedding(len(vocab), embedding_dim)
        self.batch_norm = nn.BatchNorm1d(embedding_dim, eps=1e-05, momentum=0.1, affine=False, track_running_stats=False)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)
        self.linear = nn.Linear(hidden_dim, len(vocab))

        self.optimizer = optim.Adam(self.parameters())
        self.loss_fn = nn.CrossEntropyLoss()

        self.vocab = vocab
        self.vocab_size = len(vocab)
        self.embedding_dim = embedding_dim
        self.hidden_dim = hidden_dim

        self.word_to_index = {str(w): i for i, w in enumerate(vocab)}
        self.index_to_word = {i: str(w) for i, w in enumerate(vocab)}

    def forward(self, sentences):
        embedded_sentences = self.embedding(sentences)
        embedded_sentences = self.batch_norm(embedded_sentences)
        lstm_out, _ = self.lstm(embedded_sentences)
        lstm_out = lstm_out[:, -1, :]
        out = self.linear(lstm_out)
        return out

    def train(self, sentences, targets, batch_size, epochs):
        sentences = [torch.LongTensor([self.word_to_index[str(word)] for word in sentence]) for sentence in sentences]
        targets = [torch.LongTensor([self.word_to_index[str(target)]]) for target in targets]

        sentences = pad_sequence(sentences, batch_first=True)
        targets = pad_sequence(targets, batch_first=True)

        print(f"Start to Train\tEpoch_Size:\t{epochs}\tBatch_Size:\t{batch_size}")

        for epoch in range(epochs):
            total_loss = .0
            start_time = time.time()

            for i in range(0, len(sentences), batch_size):
                batch_end = min(i + batch_size, len(sentences))

                sentence_batch = sentences[i:batch_end]
                target_batch = targets[i:batch_end].view(-1)

                out = self.forward(sentence_batch)
                target = target_batch

                loss = self.loss_fn(out, target)
                total_loss += loss
                loss.backward()

                self.optimizer.zero_grad()
                self.optimizer.step()

            end_time = time.time()

            print(f"epoch\t{epoch+1}\tloss:\t{total_loss:.5f}\ttime:\t{end_time-start_time:.5f} sec")

class WordSimilarityModel(nn.Module):
    def __init__(self, sentence_model):
        super(WordSimilarityModel, self).__init__()
        self.sentence_model = sentence_model
        self.get_index = sentence_model.word_to_index
        self.get_word = sentence_model.index_to_word
        self.cos = nn.CosineSimilarity(dim=1, eps=1e-6)

    def predict(self, word, top_n=5):
        word_embedding = self.sentence_model.embedding(torch.tensor([self.get_index[word]]))
        similarity = self.cos(word_embedding, self.sentence_model.embedding.weight)
        _, top_n_indices = torch.topk(similarity, top_n)
        return [self.get_word[i.item()] for i in top_n_indices] ## i -> tensor