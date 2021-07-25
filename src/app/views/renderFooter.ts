export const renderFooter = () => {
  const footerHtml = `
  <footer class="footer">
    <ul class="footer-block">
      <li class="footer-block__item">
        <a href="https://github.com/jatak307">GitHub</a>
      </li>
      <li class="footer-block__item">2021</li>
      <li class="footer-block__item">
        <a href="https://rs.school/js/"><img src="./assets/images/rs_school_js.svg" alt="rsSchool" class="footer-block__item-img"></a>
      </li>
    </ul>
  </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHtml);
};
