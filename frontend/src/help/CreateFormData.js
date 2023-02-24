const createFormData = (file,body) => {
    const data = new FormData();
    // console.log("IN form data", file, body)
    data.append("file", file);
    // console.log("IN form data", data)
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    // console.log("data inside foreach",data);
  
    return data;
  };
  export default createFormData;