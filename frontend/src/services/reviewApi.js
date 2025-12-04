import api from './apiClient';

export const listReviews = (productId) => api.get(`/reviews/product/${productId}`).then(r => r.data);
export const addReview = (payload) => api.post('/reviews', payload).then(r => r.data);
