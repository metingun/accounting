package com.springJpa.demo.model;

public class ResponseModel {
    private Object data;
    private String message;
    private int code;

    public ResponseModel(Object data, String message,int code) {
        this.data=data;
        this.message=message;
        this.code=code;
    }

    public static ResponseModel createResponseWithData(Object data, String message,int code) {
        return new ResponseModel(data, message,code);
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
