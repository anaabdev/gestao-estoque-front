const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.erro || data?.error || 'Erro na requisição');
  return data;
}

async function upload(path, file) {
  const formData = new FormData();
  formData.append('imagem', file, file.name || 'imagem-produto');
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.erro || data?.error || 'Erro na requisição');
  }
  return res.blob();
}

export const api = {
  login: (email, senha) =>
    request('/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
  me: () => request('/auth/me'),
  logout: () => request('/logout', { method: 'POST' }),

  listarProdutos: (categoriaId) =>
    request(`/produtos${categoriaId ? `?categoriaId=${categoriaId}` : ''}`),

  listarCategorias: () => request('/categorias'),

  criarCategoria: (nome) =>
    request('/categorias', { method: 'POST', body: JSON.stringify({ nome }) }),

  atualizarCategoria: (id, nome) =>
    request(`/categorias/${id}`, { method: 'PUT', body: JSON.stringify({ nome }) }),

  excluirCategoria: (id) =>
    request(`/categorias/${id}`, { method: 'DELETE' }),

  buscarProduto: (id) => request(`/produtos/${id}`),

  criarProduto: (dados) =>
    request('/produtos', { method: 'POST', body: JSON.stringify(dados) }),

  removerFundoImagem: (imagem) => upload('/produtos/remover-fundo', imagem),

  atualizarProduto: (id, dados) =>
    request(`/produtos/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),

  excluirProduto: (id) => request(`/produtos/${id}`, { method: 'DELETE' }),

  entrada: (id, quantidade) =>
    request(`/produtos/${id}/entrada`, { method: 'POST', body: JSON.stringify({ quantidade }) }),

  saida: (id, quantidade) =>
    request(`/produtos/${id}/saida`, { method: 'POST', body: JSON.stringify({ quantidade }) }),
};
