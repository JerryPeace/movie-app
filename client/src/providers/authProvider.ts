const adminsiteProvider = {
  login: (): Promise<void> => Promise.resolve(),
  logout: (): Promise<void> => Promise.resolve(),
  checkError: (): Promise<void> => Promise.resolve(),
  checkAuth: (): Promise<void> => Promise.resolve(),
  getPermissions: (): Promise<void> => Promise.resolve(),
};

export default adminsiteProvider;
