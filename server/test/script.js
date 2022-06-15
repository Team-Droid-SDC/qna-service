import http from "k6/http";
import { sleep } from 'k6';

// a simple get request
// export default function() {
//     let response = http.get("https://test-api.k6.io");
// };

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}