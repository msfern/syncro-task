"use client";
import { useTasks } from "../api/useTasks";
import Column from "./Column";

const Board = () => {
  console.log("Board rendered");
  const { data: tasks } = useTasks();
  console.log("tasks", tasks);
  return (
    <>
      <Column />
      <Column />
      <Column />
    </>
  );
};

export default Board;
