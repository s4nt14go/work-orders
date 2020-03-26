import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import axios from 'axios';

import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const workOrdersUrl = 'https://www.hatchways.io/api/assessment/work_orders';
const orders = JSON.parse(`[{"deadline":1584682577,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"5d1b97c6","name":"Work order 5d1b97c6","workerId":1,"worker":{"companyName":"Gabspot","email":"fbrogan1@Gabspot.uk","id":1,"image":"http://dummyimage.com/250x250.jpg/dddddd/000000","name":"Fredi Brogan"}},{"deadline":1584687692,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"32527e20","name":"Work order 32527e20","workerId":3,"worker":{"companyName":"Statcounter","email":"lmichel3@statcounter.com","id":3,"image":"http://dummyimage.com/250x250.jpg/aa00ff/ffffff","name":"Lynnell Michel"}},{"deadline":1584697821,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"d1585b31","name":"Work order d1585b31","workerId":2,"worker":{"companyName":"Yadel","email":"rcharrett2@yadel.com","id":2,"image":"http://dummyimage.com/250x250.jpg/004444/ffffff","name":"Randal Charrett"}},{"deadline":1584729166,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"02ed0092","name":"Work order 02ed0092","workerId":0,"worker":{"companyName":"Topiczoom","email":"fstorie0@topiczoom.com","id":0,"image":"http://dummyimage.com/250x250.jpg/ccccff/000000","name":"Frans Storie"}},{"deadline":1584741228,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"ae6b4a75","name":"Work order ae6b4a75","workerId":0,"worker":{"companyName":"Topiczoom","email":"fstorie0@topiczoom.com","id":0,"image":"http://dummyimage.com/250x250.jpg/ccccff/000000","name":"Frans Storie"}},{"deadline":1584791403,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"4df0e416","name":"Work order 4df0e416","workerId":0,"worker":{"companyName":"Topiczoom","email":"fstorie0@topiczoom.com","id":0,"image":"http://dummyimage.com/250x250.jpg/ccccff/000000","name":"Frans Storie"}},{"deadline":1584799023,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"86df449e","name":"Work order 86df449e","workerId":0,"worker":{"companyName":"Topiczoom","email":"fstorie0@topiczoom.com","id":0,"image":"http://dummyimage.com/250x250.jpg/ccccff/000000","name":"Frans Storie"}},{"deadline":1584801659,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"fec256b1","name":"Work order fec256b1","workerId":4,"worker":{"companyName":"Wordify","email":"agalier4@wordify.com","id":4,"image":"http://dummyimage.com/250x250.jpg/ff4444/ffffff","name":"Ashien Galier"}},{"deadline":1584802333,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"992a57dc","name":"Work order 992a57dc","workerId":2,"worker":{"companyName":"Yadel","email":"rcharrett2@yadel.com","id":2,"image":"http://dummyimage.com/250x250.jpg/004444/ffffff","name":"Randal Charrett"}},{"deadline":1584824961,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"30f2d24b","name":"Work order 30f2d24b","workerId":1,"worker":{"companyName":"Gabspot","email":"fbrogan1@Gabspot.uk","id":1,"image":"http://dummyimage.com/250x250.jpg/dddddd/000000","name":"Fredi Brogan"}},{"deadline":1584851209,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"cf9df7e7","name":"Work order cf9df7e7","workerId":0,"worker":{"companyName":"Topiczoom","email":"fstorie0@topiczoom.com","id":0,"image":"http://dummyimage.com/250x250.jpg/ccccff/000000","name":"Frans Storie"}},{"deadline":1584882780,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"81a65186","name":"Work order 81a65186","workerId":4,"worker":{"companyName":"Wordify","email":"agalier4@wordify.com","id":4,"image":"http://dummyimage.com/250x250.jpg/ff4444/ffffff","name":"Ashien Galier"}},{"deadline":1584883997,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"7e9efb80","name":"Work order 7e9efb80","workerId":4,"worker":{"companyName":"Wordify","email":"agalier4@wordify.com","id":4,"image":"http://dummyimage.com/250x250.jpg/ff4444/ffffff","name":"Ashien Galier"}},{"deadline":1584959596,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"f8569c60","name":"Work order f8569c60","workerId":0,"worker":{"companyName":"Topiczoom","email":"fstorie0@topiczoom.com","id":0,"image":"http://dummyimage.com/250x250.jpg/ccccff/000000","name":"Frans Storie"}},{"deadline":1585009400,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"768a628e","name":"Work order 768a628e","workerId":3,"worker":{"companyName":"Statcounter","email":"lmichel3@statcounter.com","id":3,"image":"http://dummyimage.com/250x250.jpg/aa00ff/ffffff","name":"Lynnell Michel"}},{"deadline":1585034555,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"7b470dff","name":"Work order 7b470dff","workerId":3,"worker":{"companyName":"Statcounter","email":"lmichel3@statcounter.com","id":3,"image":"http://dummyimage.com/250x250.jpg/aa00ff/ffffff","name":"Lynnell Michel"}},{"deadline":1585064910,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"40a50983","name":"Work order 40a50983","workerId":3,"worker":{"companyName":"Statcounter","email":"lmichel3@statcounter.com","id":3,"image":"http://dummyimage.com/250x250.jpg/aa00ff/ffffff","name":"Lynnell Michel"}},{"deadline":1585140407,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"2f6c4a2e","name":"Work order 2f6c4a2e","workerId":1,"worker":{"companyName":"Gabspot","email":"fbrogan1@Gabspot.uk","id":1,"image":"http://dummyimage.com/250x250.jpg/dddddd/000000","name":"Fredi Brogan"}},{"deadline":1585166015,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"23af3c67","name":"Work order 23af3c67","workerId":1,"worker":{"companyName":"Gabspot","email":"fbrogan1@Gabspot.uk","id":1,"image":"http://dummyimage.com/250x250.jpg/dddddd/000000","name":"Fredi Brogan"}},{"deadline":1585170933,"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","id":"ab4dcc0e","name":"Work order ab4dcc0e","workerId":1,"worker":{"companyName":"Gabspot","email":"fbrogan1@Gabspot.uk","id":1,"image":"http://dummyimage.com/250x250.jpg/dddddd/000000","name":"Fredi Brogan"}}]`);
const worker0 = {
  "companyName": "Topiczoom",
  "email": "fstorie0@topiczoom.com",
  "id": 0,
  "image": "http://dummyimage.com/250x250.jpg/ccccff/000000",
  "name": "Frans Storie"
};
const worker1 = {
  "companyName": "Gabspot",
  "email": "fbrogan1@Gabspot.uk",
  "id": 1,
  "image": "http://dummyimage.com/250x250.jpg/dddddd/000000",
  "name": "Fredi Brogan"
};
const worker2 = {
  "companyName": "Yadel",
  "email": "rcharrett2@yadel.com",
  "id": 2,
  "image": "http://dummyimage.com/250x250.jpg/004444/ffffff",
  "name": "Randal Charrett"
};
const worker3 = {
  "companyName":"Statcounter",
  "email":"lmichel3@statcounter.com",
  "id":3,
  "image":"http://dummyimage.com/250x250.jpg/aa00ff/ffffff",
  "name":"Lynnell Michel"
};
const worker4 = {
  "companyName":"Wordify",
  "email":"agalier4@wordify.com",
  "id":4,
  "image":"http://dummyimage.com/250x250.jpg/ff4444/ffffff",
  "name":"Ashien Galier"
};

jest.mock('axios');
axios.get.mockImplementation(url => {
  if (url === workOrdersUrl) {
    return Promise.resolve({data: {orders}})
  } else {
    const id = Array.from(url).pop();
    switch (id) {
      case 0:
        return Promise.resolve({data: worker0});
      case 1:
        return Promise.resolve({data: worker1});
      case 2:
        return Promise.resolve({data: worker2});
      case 3:
        return Promise.resolve({data: worker3});
      case 4:
        return Promise.resolve({data: worker4});
    }
  }
});

it("renders ok", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).toContain('Earliest first');
});

it('axios.gets ' + workOrdersUrl, async () => {
  act(() => {
    render(<App />, container);
  });
  expect(axios.get).toHaveBeenCalledWith(workOrdersUrl);
});