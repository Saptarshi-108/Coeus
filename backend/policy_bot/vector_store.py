import faiss
import numpy as np

class VectorStore:
    def __init__(self, dim: int):
        self.dim = dim
        self.index = faiss.IndexFlatIP(dim)  # inner product (cosine similarity with normalized vectors)
        self.texts = []

    def add(self, embeddings: np.ndarray, texts: list[str]):
        # embeddings shape: (n, dim)
        faiss.normalize_L2(embeddings)
        self.index.add(embeddings)
        self.texts.extend(texts)

    def search(self, query_embedding: np.ndarray, top_k=3):
        faiss.normalize_L2(query_embedding)
        D, I = self.index.search(query_embedding, top_k)
        results = []
        for idx in I[0]:
            if idx < len(self.texts):
                results.append(self.texts[idx])
        return results
