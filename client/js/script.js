document.addEventListener('DOMContentLoaded', () => {
    fetch('/courses')
      .then(response => response.json())
      .then(courses => {
        const courseGrid = document.getElementById('course-grid');
        courses.forEach(course => {
          const courseElement = document.createElement('div');
          courseElement.classList.add('course');
          courseElement.innerHTML = `
            <img src='/images/course1.jpg' alt='${course.name}'>
            <h3>${course.name}</h3>
            <p>Rp. ${course.price}</p>
            <button>Selengkapnya</button>
          `;
          courseGrid.appendChild(courseElement);
        });
      });
  });