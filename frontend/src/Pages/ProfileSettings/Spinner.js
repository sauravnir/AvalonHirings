import React ,{useState , useEffect} from 'react'
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
function Spinner() {
  return (
    <Spin
      size="large"
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
        />
      }
      fullscreen
    />
  )
}

export default Spinner