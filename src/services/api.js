const BASE_URL = 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include', // envia/recebe o cookie
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.erro || data?.error || 'Erro na requisição');
  return data;
}

export const api = {
  login: (email, senha) =>
    request('/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
  me: () => request('/auth/me'),
  logout: () => request('/logout', { method: 'POST' }),

  listarProdutos: (categoriaId) =>
    request(`/produtos${categoriaId ? `?categoriaId=${categoriaId}` : ''}`),

  buscarProduto: (id) => request(`/produtos/${id}`),

  criarProduto: (dados) =>
    request('/produtos', { method: 'POST', body: JSON.stringify(dados) }),

  atualizarProduto: (id, dados) =>
    request(`/produtos/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),

  excluirProduto: (id) => request(`/produtos/${id}`, { method: 'DELETE' }),

  entrada: (id, quantidade) =>
    request(`/produtos/${id}/entrada`, { method: 'POST', body: JSON.stringify({ quantidade }) }),
  
  saida: (id, quantidade) =>
    request(`/produtos/${id}/saida`, { method: 'POST', body: JSON.stringify({ quantidade }) }),
};