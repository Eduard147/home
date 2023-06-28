import { commentsElement } from "script.js";
import { getLikeButton, replyToComment, editorComment } from "script.js";



const renderComments = (comments, listComments) => {

  const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join(""); 

  commentsElement.innerHTML = commentsHtml;
  getLikeButton();
  replyToComment();
  editorComment();

};

export default renderComments;