"use strict";

let carros = [
  {
    placa: "ABC123",
    marca: "Toyota",
    estado: "disponible",
    valorDia: 50,
  },
  {
    placa: "DEF456",
    marca: "Honda",
    estado: "disponible",
    valorDia: 60,
  },
  {
    placa: "GHI789",
    marca: "Ford",
    estado: "no disponible",
    valorDia: 55,
  },
  {
    placa: "JKL012",
    marca: "Chevrolet",
    estado: "disponible",
    valorDia: 70,
  },
  {
    placa: "MNO345",
    marca: "Nissan",
    estado: "no disponible",
    valorDia: 65,
  },
  {
    placa: "PQR678",
    marca: "Hyundai",
    estado: "disponible",
    valorDia: 75,
  },
  {
    placa: "STU901",
    marca: "Volkswagen",
    estado: "disponible",
    valorDia: 55,
  },
  {
    placa: "VWX234",
    marca: "Mazda",
    estado: "no disponible",
    valorDia: 80,
  },
  {
    placa: "YZA567",
    marca: "Kia",
    estado: "disponible",
    valorDia: 65,
  },
  {
    placa: "BCD890",
    marca: "Subaru",
    estado: "no disponible",
    valorDia: 70,
  },

  {
    placa: "EFG123",
    marca: "Audi",
    estado: "no disponible",
    valorDia: 90,
  },
  {
    placa: "HIJ456",
    marca: "Mercedes",
    estado: "no disponible",
    valorDia: 85,
  },
  {
    placa: "KLM789",
    marca: "BMW",
    estado: "no disponible",
    valorDia: 95,
  },
  {
    placa: "NOP012",
    marca: "Lexus",
    estado: "no disponible",
    valorDia: 100,
  },

  {
    placa: "USH324",
    marca: "Hyundai",
    estado: "no disponible",
    valorDia: 200,
  },
  // Puedes agregar más carros si lo deseas
];

let usuarios = [
  /* 
  {
    username: "ushima10",
    name: "Daniel Ushima",
    password: "contraseña1",
    role: "Administrador",
    key: "ushima",
    prestamos: [],
  },
  {
    username: "lalamejia19",
    name: "Laura Mejia",
    password: "contraseña2",
    key: "lala",
    role: "Usuario",

    prestamos: [
      {
        username: "lalamejia19",
        placa: "USH324",
        marca: "Hyundai",
        fechaPrestamo: `2023-12-12`,
        fechaDevolucion: `2024-12-12`,
        numeroRenta: 1234567,
        devuelto: false,
      },
      {
        username: "lalamejia19",
        placa: "EFG123",
        marca: "Audi",
        fechaPrestamo: `2023-12-12`,
        fechaDevolucion: `2024-12-12`,
        numeroRenta: 2222222,
        devuelto: false,
      },
    ],
  },
  {
    username: "elPanda00",
    name: "David Jaramillo",
    password: "contraseña3",
    role: "Usuario",
    key: "panda",
    prestamos: [],
  }, */
];
document.addEventListener("DOMContentLoaded", function () {
  let storedCarros = JSON.parse(localStorage.getItem("carros"));
  if (storedCarros) {
    carros = storedCarros;
  }
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
});

const elPlate = document.getElementById("placa");
const elFinalDate = document.getElementById("fecha-final");
const elRentNumber = document.getElementById("numero-renta");

const btnGuardar = document.getElementById("btn-guardar");
let actualDate = document.getElementById("actualDate");
let currentUser = "";
let movementsContainer = document.querySelector(".movements");
let movementsDiv = document.querySelector(".movements");
let welcomeParagraph = document.querySelector(".welcome");
let logout = document.querySelector("#logout");
/*  Funciones */

function toggleState(plate) {
  let car = findCar(plate);
  car.estado = car.estado === "disponible" ? "no disponible" : "disponible";
}

function findCar(plate) {
  return carros.find((carro) => carro.placa === plate);
}

function modalList() {
  let storedCarros = JSON.parse(localStorage.getItem("carros"));
  if (storedCarros) {
    carros = storedCarros;
  }
  arrayDisponibles = carros.filter(function (carro) {
    return carro.estado === "disponible";
  });
}

function realizarLogout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function rents() {
  // Obtén el contenedor de los movimientos
  let movementsDiv = document.querySelector(".movements");

  // Elimina todos los nodos hijos del contenedor
  while (movementsDiv.firstChild) {
    movementsDiv.removeChild(movementsDiv.firstChild);
  }

  // Verifica si currentUser.prestamos es undefined o null
  if (currentUser.prestamos) {
    // Invierte el orden de los préstamos para que el último sea el primero
    currentUser.prestamos.reverse();

    // Filtra los préstamos del currentUser
    let userPrestamos = currentUser.prestamos.filter(
      (prestamo) => prestamo.username === currentUser.username
    );

    // Ahora puedes agregar los nuevos elementos al contenedor
    for (let prestamo of userPrestamos) {
      // Crear un nuevo .movements__row div
      let rowDiv = document.createElement("div");
      rowDiv.className = "movements__row";

      // Crear .movements__type, .movements__date, y .movements__placa divs
      let typeDiv = document.createElement("div");
      typeDiv.className = `movements__type movements__type--${
        prestamo.devuelto ? "devuelto" : "pendiente"
      }`;
      typeDiv.textContent = prestamo.devuelto
        ? `RL${prestamo.numeroRenta}`
        : `RL${prestamo.numeroRenta}`;

      let dateDiv = document.createElement("div");
      dateDiv.className = "movements__date";
      dateDiv.textContent = prestamo.fechaDevolucion;

      let marcaDiv = document.createElement("div");
      marcaDiv.className = "movements__marca";
      marcaDiv.textContent = prestamo.marca;

      let placaDiv = document.createElement("div");
      placaDiv.className = "movements__placa";
      placaDiv.textContent = prestamo.placa;

      // Append the divs to the .movements__row div
      rowDiv.appendChild(typeDiv);
      rowDiv.appendChild(dateDiv);
      rowDiv.appendChild(marcaDiv);
      rowDiv.appendChild(placaDiv);

      // Append the .movements__row div to the .movements div
      movementsDiv.appendChild(rowDiv);
    }
  }
}
