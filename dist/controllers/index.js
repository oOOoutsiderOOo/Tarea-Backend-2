"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.getMovies = exports.getMovie = exports.deleteMovie = exports.createMovie = exports.deleteDirector = exports.updateDirector = exports.createDirector = exports.getDirector = exports.getDirectors = exports.addFav = exports.register = exports.login = void 0;
var user_controller_1 = require("./user.controller");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return user_controller_1.login; } });
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return user_controller_1.register; } });
Object.defineProperty(exports, "addFav", { enumerable: true, get: function () { return user_controller_1.addFav; } });
var directors_controller_1 = require("./directors.controller");
Object.defineProperty(exports, "getDirectors", { enumerable: true, get: function () { return directors_controller_1.getDirectors; } });
Object.defineProperty(exports, "getDirector", { enumerable: true, get: function () { return directors_controller_1.getDirector; } });
Object.defineProperty(exports, "createDirector", { enumerable: true, get: function () { return directors_controller_1.createDirector; } });
Object.defineProperty(exports, "updateDirector", { enumerable: true, get: function () { return directors_controller_1.updateDirector; } });
Object.defineProperty(exports, "deleteDirector", { enumerable: true, get: function () { return directors_controller_1.deleteDirector; } });
var movies_controller_1 = require("./movies.controller");
Object.defineProperty(exports, "createMovie", { enumerable: true, get: function () { return movies_controller_1.createMovie; } });
Object.defineProperty(exports, "deleteMovie", { enumerable: true, get: function () { return movies_controller_1.deleteMovie; } });
Object.defineProperty(exports, "getMovie", { enumerable: true, get: function () { return movies_controller_1.getMovie; } });
Object.defineProperty(exports, "getMovies", { enumerable: true, get: function () { return movies_controller_1.getMovies; } });
Object.defineProperty(exports, "updateMovie", { enumerable: true, get: function () { return movies_controller_1.updateMovie; } });
