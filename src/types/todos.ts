export type RootStackParamList = {
  ForgotPassword: undefined
  List: { listId: string };
  LogIn: undefined
  Main: undefined
  PasswordChange: undefined
  Settings: undefined
  SignUp: undefined
  Splash: undefined
};

// You can also keep your existing types here.
export type TodoStatus = 'incomplete' | 'partiallyComplete' | 'complete';

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  user_id: string,
  list_id: string,
}

export interface TodoList {
  id: string;
  name: string;
  user_id: string,
}
