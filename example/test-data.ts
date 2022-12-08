import "core-js/actual";
const axios = require("axios").default;
const XMLHttpRequest = require("xhr2");
import fetch from "node-fetch";
import { request, fetch as undiciFetch } from "undici";

export const data = {
  stringValue: "some stringn data",
  objData: {
    liquidShark: 0,
    stringData: "some string data",
  },
};

export const functions = {
  copyByObjectAssign: (data) => {
    const clone = Object.assign({}, data);
  },

  copyByForCycle: (data) => {
    let clone = {};

    for (let key in data) {
      clone[key] = data[key];
    }
  },

  copyByJSONStringify: (data) => {
    const clone = JSON.parse(JSON.stringify(data));
  },

  copyBySpread: (data) => {
    const clone = { ...data };
  },

  copyByLodash: (data) => {
    function isPrototype(value) {
      const objectProto = Object.prototype;

      const Ctor = value && value.constructor;
      const proto =
        (typeof Ctor === "function" && Ctor.prototype) || objectProto;

      return value === proto;
    }

    return typeof data.constructor === "function" && !isPrototype(data)
      ? Object.create(
          Object.getPrototypeOf(data),
          Object.getOwnPropertyDescriptors(data)
        )
      : {};
  },

  copyByStructuredClone: (data) => {
    const clone = structuredClone(data);
  },
};

export const singleFunc = () => {
  const clone = structuredClone(data);
};

export const singleData = {
  stringValue: "some string data",
  objData: {
    liquidShark: 0,
    stringData: "some string data",
  },
  date: Date.now(),
  func: () => {},
};

export const asyncFunctions = {
  getByFetch: async (url) => {
    const result = await fetch(url, {
      method: "GET",
    });
  },

  getByAxios: async (url) => {
    const result = await axios(url);
  },

  getByXMLHttpRequest: (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", url);
      xhr.send();

      xhr.onload = function () {
        resolve(xhr.response);
      };
    });
  },

  getByUndiciRequest: async (url) => {
    const { statusCode, headers, trailers, body } = await request(url);
  },

  getByUndiciFetch: async (url) => {
    const { headers, body } = await undiciFetch(url);
  },
};

export const asyncData = "https://www.google.com/";

export const stringFunctions = {
  formatStringByTemplate: (string) => {
    const newString = `hajksfdnkasjcn skdv ka csakdj casd v ${string} wejfaks`;
  },

  formatStringByPlus: async (string) => {
    const newString =
      "hajksfdnkasjcn skdv ka csakdj casd v " + string + " wejfaks";
  },
};

export const stringData = "https://www.google.com/";
