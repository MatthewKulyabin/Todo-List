import axios from 'axios';
import { create } from 'zustand';

import { TaskAttributes, TaskInterface } from './types/TaskInterface';

interface TaskState {
  tasks: TaskInterface[];
  tasksFiltered: TaskInterface[];
  filterBy: string;
  error: null | string;
  isLoading: boolean;
  getTasks: () => void;
  addTask: (task: TaskAttributes) => void;
  deleteTask: (id: number) => void;
  changeTaskStatus: (id: number) => void;
  changeTaskFavorite: (id: number) => void;
  filterTasks: (filterBy: string) => void;
}

export const useTaskStore = create<TaskState>((set, get, store) => ({
  tasks: [],
  tasksFiltered: [],
  filterBy: 'all',
  error: null,
  isLoading: true,

  getTasks: async () => {
    const { data } = await axios.get('https://cms.dev-land.host/api/tasks');
    set({ tasks: data.data, isLoading: false });
  },

  addTask: async (task: TaskAttributes) => {
    const { data } = await axios.post('https://cms.dev-land.host/api/tasks', {
      data: task,
    });
    set((state) => ({ tasks: [...state.tasks, data.data] }));
    get().filterTasks(get().filterBy);
  },

  deleteTask: async (id: number) => {
    const { data } = await axios.delete(
      'https://cms.dev-land.host/api/tasks/' + id,
    );
    set((state) => ({
      tasks: [...state.tasks.filter((task) => task.id !== data.data.id)],
    }));
    get().filterTasks(get().filterBy);
  },

  changeTaskStatus: async (id: number) => {
    let taskToChange = get().tasks.find((task) => task.id === id);
    const isFavorite = taskToChange?.attributes.status.includes('favorite');
    const notCompleted =
      taskToChange?.attributes.status.includes('not_completed');
    let status = notCompleted ? ' completed ' : ' not_completed ';
    status += isFavorite ? ' favorite ' : '';

    const { data } = await axios.put(
      'https://cms.dev-land.host/api/tasks/' + id,
      { data: { status } },
    );
    taskToChange = data.data;
    set((state) => {
      const taskIndexToChange = state.tasks.findIndex(
        (task) => task.id === taskToChange?.id,
      );
      const newTasks = state.tasks;

      newTasks[taskIndexToChange] = taskToChange as TaskInterface;
      return { tasks: newTasks };
    });
    get().filterTasks(get().filterBy);
  },

  changeTaskFavorite: async (id: number) => {
    let taskToChange = get().tasks.find((task) => task.id === id);
    const isFavorite = taskToChange?.attributes.status.includes('favorite');
    const notCompleted =
      taskToChange?.attributes.status.includes('not_completed');
    let status = isFavorite ? '' : ' favorite ';
    status += notCompleted ? ' not_completed ' : ' completed ';

    const { data } = await axios.put(
      'https://cms.dev-land.host/api/tasks/' + id,
      { data: { status } },
    );
    taskToChange = data.data;
    set((state) => {
      const taskIndexToChange = state.tasks.findIndex(
        (task) => task.id === taskToChange?.id,
      );
      const newTasks = state.tasks;

      newTasks[taskIndexToChange] = taskToChange as TaskInterface;
      return { tasks: newTasks };
    });
    get().filterTasks(get().filterBy);
  },

  filterTasks: (filterBy: string) => {
    set((state) => ({ filterBy }));
    switch (get().filterBy) {
      case 'completed':
        set((state) => ({
          tasksFiltered: state.tasks.filter(
            (task) => !task.attributes.status.includes('not_completed'),
          ),
        }));
        break;
      case 'not_completed':
        set((state) => ({
          tasksFiltered: state.tasks.filter((task) =>
            task.attributes.status.includes('not_completed'),
          ),
        }));
        break;
      case 'favorite':
        set((state) => ({
          tasksFiltered: state.tasks.filter((task) =>
            task.attributes.status.includes('favorite'),
          ),
        }));
        break;
      default:
        set((state) => ({
          tasksFiltered: [],
        }));
        break;
    }
  },
}));
