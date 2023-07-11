"use strict";
import { format } from "date-fns";
import { getCurrentDate } from "./date.js";
// // Т. к. renderStudents экспортировалась по умолчанию default,
// // то имя функции мы не берем в фигурные скобки
import renderApp from "./render.js";
import { fetchGet } from "./api.js";
import { getListComments } from "./listComments.js";
const commentsLoading = document.querySelector('.data-loading');


let comments = [];

export function getAPI() {
  return fetchGet()
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          id: comment.id,
          name: comment.author.name,
          dateСreation: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
          text: comment.text,
          likeComment: comment.isLiked,
          likesNumber: comment.likes,
          propertyColorLike: 'like-button no-active-like',
        }
      });
      comments = appComments;
      return  renderApp(comments, getListComments);
    })
    .then((response) => {
      commentsLoading.style.display = 'none';
    })
    .catch((error) => {

      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуйте позже");
        getAPI();
      } else if (error.message === "Нет авторизации") {          
          console.log(error);
        } else {
          alert('Кажется, у вас сломался интернет, попробуйте позже');
          console.log(error);
        }
    });
};

getAPI();