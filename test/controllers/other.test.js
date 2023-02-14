import axios from "axios";

test("[GET] test/info/ return data correctly", async () => {
  const response = await axiosGet("http://localhost:8080/test/info");
});
