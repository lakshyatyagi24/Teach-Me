import React, { useState } from "react";
import { Button, UserTable } from "../../components";
import { Image, Text, Wrapper } from "./styles";
import { Flex } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoader } from "../../store/slices/globalLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const column = ["Image", "Name", "Faculty", "Actions"];

const Courses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(setGlobalLoader(true));
    axios({
      url: "http://localhost:5000/api/courses",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCourses(res.data);
      })
      .finally(() => {
        dispatch(setGlobalLoader(false));
      });
  }, []);

  const editHandler = (item) => {
    navigate(`/edit-course/${item._id}`);
  };

  const deleteHandler = (item) => {
    dispatch(setGlobalLoader(true));
    axios({
      url: `http://localhost:5000/api/courses/${item._id}`,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        const filterCourses = courses.filter(({ _id }) => _id !== item._id);
        setCourses(filterCourses);
        toast.success("Course deleted Successfully");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        dispatch(setGlobalLoader(false));
      });
  };

  return (
    <Wrapper>
      <Flex justify={"space-between"}>
        <Text>Courses</Text>
        <Button type="primary" onClick={() => navigate("/new-course")}>
          Add Course
        </Button>
      </Flex>
      <UserTable column={column}>
        <>
          {Object.keys(courses).length > 0 &&
            courses.map((item, index) => (
              <tr key={index}>
                <td className="p-3">
                  <Image src={`http://localhost:5000${item?.image}`} />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.faculty}</td>
                <td className="p-3">
                  <Flex gap="20px">
                    <EditOutlined
                      onClick={() => editHandler(item)}
                      style={{ color: "blue" }}
                    />
                    <DeleteOutlined
                      onClick={() => deleteHandler(item)}
                      style={{ color: "red" }}
                    />
                  </Flex>
                </td>
              </tr>
            ))}
        </>
      </UserTable>
    </Wrapper>
  );
};

export default Courses;
