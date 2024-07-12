//          Topic    =>          FrontEnd
// Api Fetch by Axios 

//    Get
const getData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/todo");
    setData(res.data);
  } catch (error) {
    console.log(error);
  }
};

  // Post

  const postData = async (value) => {
    try {
      const res = await axios.post("http://localhost:5000/api/todo", value);

      console.log(res.status);
      if (res.status === 201) alert("Creted Todo");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // Delete

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/${id}`);
      // console.log(res.status);
      if (res.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Put

  const putTodo = async (data) => {
    const { _id, Enter_Todo, Enter_dis, Enter_type } = data;
    try {
      const res = await axios.put(`http://localhost:5000/api/${_id}`, {
        Enter_Todo,
        Enter_dis,
        Enter_type,
      });
      // console.log(res);
      if (res.status === 200) {
        getData();
        hide("hidden"); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);


//          Topic    =>  Back_End
//   Get

export const getTodo = async (req, res) => {
    try {
      const TODO = await todoSchema.find();
      res.status(200).json(TODO);
    } catch (err) {
      res.status(400).json({ error: "Can't get", err });
    }
  };
  
  // Post
  
  export const postTodo = async (req, res) => {
    const { Enter_Todo, Enter_dis, Enter_type } = req.body;
    try {
      const TODO = await todoSchema.create({ Enter_Todo, Enter_dis, Enter_type });
      res.status(201).json(TODO);
    } catch (err) {
      res.status(400).json({ error: "Invalid data", err });
    }
  };
  
  // Put
  
  export const PutTodo = async (req, res) => {
    const _id = req.params.id;
    const { Enter_Todo, Enter_dis, Enter_type } = req.body;
    try {
      const TODO = await todoSchema.findByIdAndUpdate(_id, {
        Enter_Todo,
        Enter_dis,
        Enter_type,
      });
  
      if (!TODO) {
        return res.status(404).json({ error: "Todo not found" });
      }
  
      res.status(200).json({ message: "Todo Update successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", err });
    }
  };
  
  // Delete
  
  export const deleteTodo = async (req, res) => {
    const _id = await req.params.id;
  
    try {
      const TODO = await todoSchema.findByIdAndDelete(_id);
  
      if (!TODO) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", err });
    }
  };
  
