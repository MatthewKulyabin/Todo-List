import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { Button, Flex, Menu, Table } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { TaskAttributes } from '../store/types/TaskInterface';
import { getDateFromString } from '../core/utils';
import TaskForm from './taskForm';
import { menuItems } from '../core/config';

const TodoList = () => {
  const {
    tasks,
    tasksFiltered,
    filterBy,
    deleteTask,
    changeTaskStatus,
    changeTaskFavorite,
    filterTasks,
  } = useTaskStore();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <h2>{text}</h2>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <h3>{text}</h3>,
    },
    {
      title: 'Published Date',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      render: (publishedAt: string) => getDateFromString(publishedAt),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => getDateFromString(createdAt),
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: string) => getDateFromString(updatedAt),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'statusCompleted',
      render: (status: string, record: TaskAttributes) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => changeTaskStatus(record.id as number)}
        >
          {!status.includes('not_completed') ? (
            <CheckCircleFilled style={{ color: '#1a8fff', fontSize: '2rem' }} />
          ) : (
            <CloseCircleFilled style={{ color: '#ff2936', fontSize: '2rem' }} />
          )}
        </div>
      ),
    },
    {
      title: 'Favorite',
      dataIndex: 'status',
      key: 'statusFavorite',
      render: (status: string, record: TaskAttributes) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => changeTaskFavorite(record.id as number)}
        >
          {status.includes('favorite') ? (
            <StarFilled style={{ color: '#1a8fff', fontSize: '2rem' }} />
          ) : (
            <StarOutlined style={{ color: '#1a8fff', fontSize: '2rem' }} />
          )}
        </div>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <Button type="primary" danger onClick={() => deleteTask(+id)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleFilter = (e: any) => {
    filterTasks(e.key);
  };

  const getData = () => {
    return filterBy !== 'all'
      ? tasksFiltered.map((task) => ({
          ...task.attributes,
          id: task.id,
          key: task.id,
        }))
      : tasks.map((task) => ({
          ...task.attributes,
          id: task.id,
          key: task.id,
        }));
  };

  return (
    <>
      <TaskForm />
      <hr />
      <Flex gap="middle">
        <Menu
          onClick={handleFilter}
          style={{ width: 256, marginTop: '2rem', fontSize: '1rem' }}
          defaultSelectedKeys={['all']}
          mode="inline"
          items={menuItems}
        />
        <Table
          columns={columns}
          dataSource={getData()}
          title={() => <h1>Header</h1>}
          pagination={false}
        />
      </Flex>
    </>
  );
};

export default TodoList;
