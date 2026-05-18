import { defineStore } from 'pinia';
import { api } from '@/api';
import { setToken, clearToken, getToken } from '@/api/request';

export const useUserStore = defineStore('user', {
  state: () => ({ user: null, token: getToken() || '' }),
  actions: {
    async login(payload) {
      const data = await api.login(payload);
      setToken(data.token);
      this.token = data.token;
      this.user = data.user;
      return data;
    },
    async fetchMe() {
      this.user = await api.me();
      return this.user;
    },
    logout() {
      clearToken();
      this.token = '';
      this.user = null;
    }
  }
});
