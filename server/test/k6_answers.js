import http from "k6/http";
import { sleep } from 'k6';

// a simple get request
// export default function() {
//     let response = http.get("https://test-api.k6.io");
// };

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }

export let options = {
  vus: 100, //stimulate how many virtual users
  duration: "30s", //how long you want it to run
};

//Below randomize the endpoints
export default function () {
  http.get(`http://localhost:3001/qa/questions/${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}/answers`);
};