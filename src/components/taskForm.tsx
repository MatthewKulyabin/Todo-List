import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { TaskAttributes } from '../store/types/TaskInterface';

const TaskForm = () => {
  const [form] = Form.useForm();

  const { addTask } = useTaskStore();

  const onFinish = (values: TaskAttributes) => {
    values.status = 'not_completed';
    addTask(values);
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1>Add New Task</h1>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TaskForm;
