import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import heroInterior from "./assets/hero-interior.png";
import modelingProcess from "./assets/modeling-process-optimized.jpg";
import teacherPhoto from "./assets/teacher-optimized.jpg";
import workExterior from "./assets/work-exterior-optimized.jpg";
import workBedroom from "./assets/work-bedroom-optimized.jpg";
import workLiving from "./assets/work-living-optimized.jpg";
import learnBlocks from "./assets/learn-blocks.png";
import audienceBeginner from "./assets/audience-beginner.png";
import audienceDesigner from "./assets/audience-designer.png";

const audience = [
  {
    title: "Новичкам",
    image: audienceBeginner,
    text: "Курс по 3D-визуализации: для тех, кто вчера не знал, с какой стороны подойти к компьютеру. Мы проведем вас за руку от установки программы до создания первого коммерческого проекта. Итог: вы не просто учитесь нажимать кнопки — вы начинаете мыслить как  3D-визуализатор. Портфолио с работами,которыми можно гордиться,  гарантировано.",
  },
  {
    title: "Графическим, веб-дизайнерам, архитекторам",
    image: audienceDesigner,
    text: `Этот курс — подойдёт также для тех кто
уже «варится» в 3D, но чувствует потолок.
Если вы умеете моделировать, 
но ваши рендеры выдают отсутствие
«вау-эффекта» — вы пришли по адресу.
Мы разбираем не только базу, а продвинутую
физику света, нюансы настройки сложных 
материалов и алгоритмы создания фотореализма, 
о которых редко говорят в других школах.`,
  },
];

const skills = [
  {
    title: "Разбираться в процессе работы",
    text: "Освоите главные этапы работы. На практике разберёте интерфейс программы 3ds Max.",
  },
  {
    title: "Подбирать визуальные ориентиры",
    text: `Научитесь взаимодействовать с заказчиком и
разбирать ТЗ, понимать что ему нужно.  Узнаете,
где искать вдохновение для 
будущего проекта.`,
  },
  {
    title: `Создавать 3d объекты, сцены
и архитектурные пространства`,
    text: `Отрисуете модели интерьера, техники и даже
музыкального инструмента.`,
  },
  {
    title: "Выстраивать схемы освещения и настраивать рендер",
    text: `На практике узнаете, как ставить свет для 
реалистичного результата. Освоите правила композиции,
цветовой гармонии, поведения света и теней.`,
  },
];

const courseItems = [
  { title: "Основы интерфейса 3ds Max" },
  { title: "Работа с привязками" },
  { title: "Моделирование твердотельных поверхностей" },
  { title: "Моделирование органических поверхностей" },
  { title: "Кривые (Сплайны)" },
  { title: "Сборка сцены" },
  { title: "Свет" },
  { title: "Материалы" },
  { title: "PBR - материалы" },
  { title: "Рендер" },
  { title: "Пост - обработка" },
  {
    title: "Выход на фриланс",
    caption:
      "На этом этапе вы сможете брать первые заказы на фрилансе и начать зарабатывать.",
  },
];

const learningSlides = [
  {
    title: "Теория",
    subtitle: "Получаете знания",
    text: "Получаете знания в формате видеоурока, с возможностью задавать интересующие Вас вопросы.",
  },
  {
    title: "Практика",
    subtitle: "Выполняете задания",
    text: "Вы обучаетесь на живом материале: собираете сцену, настраиваете материалы, свет и рендер, чтобы закрепить каждый этап.",
  },
  {
    title: "Анализ результатов",
    subtitle: "Контроль со стороны преподавателя",
    text: "Ваши задания проходят персональную проверку. После этого вы получаете рекомендации и понимаете, как улучшить результат.",
  },
];

const projects = [
  { title: "Интерьер №1", image: workExterior },
  { title: "Интерьер №2", image: workBedroom },
  { title: "Интерьер №3", image: workLiving },
];

const faq = [
  {
    question: "Нужно ли уметь рисовать от руки, чтобы стать 3D-моделлером?",
    answer:
      "Нет, рисовать от руки, как художник, не нужно. Современная 3D-графика строится на чертежах, логике и программах.",
  },
  {
    question: "Какой компьютер нужен для 3D-моделирования?",
    answer:
      "Для старта подойдет современный ноутбук или ПК с дискретной видеокартой, 16 ГБ оперативной памяти и SSD. Для сложных сцен железо можно усилить позже.",
  },
  {
    question: "С чего именно начать обучение?",
    answer:
      "Начать лучше с интерфейса программы, базового моделирования, работы со сценой, светом и материалами. Курс выстроен именно в такой последовательности.",
  },
  {
    question:
      "С какой программы начать обучение? Blender или платные программы (3ds Max, Maya)?",
    answer:
      "Для интерьерной визуализации чаще используют 3ds Max и Corona. Blender тоже полезен, но для этого курса основной рабочий инструмент - 3ds Max.",
  },
  {
    question: "Сколько часов в неделю нужно уделять для обучения?",
    answer:
      "Оптимально закладывать 5-8 часов в неделю: посмотреть уроки, повторить действия и выполнить практическое задание.",
  },
  {
    question: "Какое портфолио нужно, чтобы начать работать?",
    answer:
      "Достаточно 3-5 аккуратных работ: интерьер, предметная сцена и один проект с понятным светом, материалами и финальным рендером.",
  },
  {
    question: "Действуют ли какие-нибудь программы рассрочки?",
    answer:
      "Да, стоимость можно разбить на несколько платежей. Детали лучше уточнить через форму заявки или консультацию.",
  },
  {
    question: "Когда я смогу начать зарабатывать?",
    answer:
      "Первые простые заказы можно брать после сборки портфолио и уверенного выполнения базовых задач по моделированию и визуализации.",
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
};

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Введите имя.";
  }

  if (values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Введите телефон.";
  }

  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Проверьте email.";
  }

  return errors;
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [openedFaq, setOpenedFaq] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [isThanksOpen, setIsThanksOpen] = useState(false);
  const activeLessonItem = learningSlides[activeLesson];

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function submitForm(event) {
    event.preventDefault();
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: `${form.phone}${form.email ? `, ${form.email}` : ""}`,
          message: "Заявка на курс по 3D-визуализации интерьера",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Не удалось отправить заявку.");
      }

      setForm(initialForm);
      setStatus("success");
      setMessage("");
      setIsThanksOpen(true);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <main>
      <header className="header">
        <div className="brandWrapper">
          <a href="#top" className="brand">
            КАЗАНСКИЙ НАЦИОНАЛЬНЫЙ ИССЛЕДОВАТЕЛЬСКИЙ
            <span>ТЕХНОЛОГИЧЕСКИЙ УНИВЕРСИТЕТ</span>
          </a>
        </div>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#program">Содержание курса</a>
          <a href="#faq">Часто задаваемые вопросы</a>
        </nav>
      </header>

      <section className="hero panel" id="top">
        <div className="heroText">
          <div className="mainBlock">
            <h1>Курс по 3D визуализации интерьера в 3ds Max и Corona!</h1>
            <p>
              Наш курс по 3D-визуализации — это ваш ключ к освоению профессии 3d
              визуализатора!
            </p>
          </div>

          <a className="button" href="#signup">
            Записаться на курс
          </a>
        </div>
        <img
          className="heroImage"
          src={heroInterior}
          alt="Визуализация современного интерьера"
        />
      </section>

      <section className="panel audience" aria-labelledby="audience-title">
        <h2 id="audience-title">Кому подойдёт данный курс?</h2>
        <div className="audienceGrid">
          {audience.map((item) => (
            <article className="audienceCard" key={item.title}>
              <img
                className="audienceIcon"
                src={item.image}
                alt=""
                aria-hidden="true"
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="learn section">
        <div className="learnText">
          <h2>Чему вы научитесь</h2>
          <div className="skillGrid">
            {skills.map((skill) => (
              <article className="skill" key={skill.title}>
                <h3>
                  <span className="checkIcon">✓</span>
                  {skill.title}
                </h3>
                <p>{skill.text}</p>
              </article>
            ))}
          </div>
        </div>
        <img
          className="learnImage"
          src={learnBlocks}
          alt="3D-блоки и планшет"
        />
      </section>

      <section className="section process">
        <h2>Как проходит обучение</h2>
        <div className="learningStage" aria-label="Этапы обучения">
          <img
            src={modelingProcess}
            alt="Процесс моделирования персонажа в 3D-редакторе"
          />
          <article className="lessonCard">
            <h3>
              <span className="checkIcon">✓</span>
              {activeLessonItem.title}
            </h3>
            <strong>{activeLessonItem.subtitle}</strong>
            <p>{activeLessonItem.text}</p>
            <div className="lessonControls" aria-label="Навигация по этапам">
              <button
                type="button"
                onClick={() =>
                  setActiveLesson((current) =>
                    current === 0 ? learningSlides.length - 1 : current - 1,
                  )
                }
                aria-label="Предыдущий этап"
              >
                &lt;
              </button>
              <span>
                {activeLesson + 1} / {learningSlides.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveLesson((current) =>
                    current === learningSlides.length - 1 ? 0 : current + 1,
                  )
                }
                aria-label="Следующий этап"
              >
                &gt;
              </button>
            </div>
            <div className="lessonDots" aria-label="Выбор этапа">
              {learningSlides.map((slide, index) => (
                <button
                  type="button"
                  key={`${slide.title}-dot-${index}`}
                  className={activeLesson === index ? "active" : ""}
                  onClick={() => setActiveLesson(index)}
                  aria-label={`Показать этап ${index + 1}`}
                />
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="panel program" id="program">
        <h2>Содержание курса</h2>
        <h3>Autodesk 3d Max</h3>
        <ul>
          {courseItems.map((item) => (
            <li
              key={item.title}
              className={
                item.caption
                  ? "courseItem courseItem--withCaption"
                  : "courseItem"
              }
            >
              <span>{item.title}</span>
              {item.caption && (
                <p className="courseItemCaption">{item.caption}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="section teacher" id="teacher">
        <h2>Преподаватель обучения</h2>
        <div className="teacherGrid">
          <img src={teacherPhoto} alt="Преподаватель курса" />
          <article className="teacherInfo">
            <h3>Данис Кадиров</h3>
            <strong>3D - модельер</strong>
            <p>
              Специалист по созданию трехмерных объектов, персонажей и
              окружения. Обеспечиваю полный цикл разработки 3D-контента: от
              референса и моделирования до текстурирования, риггинга (при
              необходимости) и финального рендера.
            </p>
          </article>
        </div>
      </section>

      <section className="section works" id="works">
        <h2>Работы преподавателя</h2>
        <div className="workGrid">
          {projects.map((project) => (
            <article key={project.title}>
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="panel certificate">
        <h2>Ваш сертификат после курса</h2>
        <div className="certificateGrid">
          <div className="certificateAvatar" aria-hidden="true"></div>
          <div>
            <h3>Junior 3D-моделлер</h3>
          </div>
          <div className="certificateLabel">Инструменты</div>
          <div>
            <div className="tools">
              <span>
                <b>▣</b> Autodesk 3d max
              </span>
              <span>
                <b>▣</b> Blender
              </span>
              <span>
                <b>▣</b> ZBrush
              </span>
            </div>
          </div>
          <div className="certificateLabel">Навыки</div>
          <ul className="certificateList">
            <li>Поиск референсов</li>
            <li>Знание основ трёхмерной графики</li>
            <li>Создание трёхмерной модели объектов</li>
            <li>Работа с материалами и текстурами</li>
            <li>Выстраивание схем освещения</li>
            <li>Применение реалистичного рендера</li>
          </ul>
          <div className="certificateLabel">Проекты</div>
          <ul className="certificateList">
            <li>Создание 3d интерьера</li>
            <li>Настройка освещения</li>
            <li>Рендер 3d интерьера</li>
          </ul>
        </div>
      </section>

      <section className="panel faq" id="faq">
        <h2>Часто задаваемые вопросы</h2>
        <div className="faqList">
          {faq.map((item, index) => (
            <article className="faqItem" key={item.question}>
              <button
                type="button"
                aria-expanded={openedFaq === index}
                onClick={() => setOpenedFaq(openedFaq === index ? -1 : index)}
              >
                {item.question}
                <span aria-hidden="true"></span>
              </button>
              {openedFaq === index && <p>{item.answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="section signup" id="signup">
        <article className="priceCard">
          <h2>Стоимость курса</h2>
          <ul>
            <li>Рассрочка на 12 месяцев</li>
            <li>
              Студенты могут вернуть до 13% курса, оформив налоговый вычет
            </li>
            <li>Создание трёхмерной модели объектов</li>
          </ul>
          <div className="price">
            <strong>4000₽</strong>
            <span>/мес</span>
            <s>9990₽/мес</s>
          </div>
        </article>

        <form className="form" onSubmit={submitForm} noValidate>
          <h2>Записаться на курс или получить бесплатную консультацию</h2>

          <label>
            <span>Имя</span>
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Имя"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <small>{errors.name}</small>}
          </label>

          <label>
            <span>Телефон</span>
            <input
              name="phone"
              value={form.phone}
              onChange={updateField}
              placeholder="Телефон"
              inputMode="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <small>{errors.phone}</small>}
          </label>

          <label>
            <span>Электронная почта</span>
            <input
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="Электронная почта"
              inputMode="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <small>{errors.email}</small>}
          </label>

          <button
            className="button formSubmit"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Отправляем..." : "Отправить заявку"}
          </button>
          {message && status === "error" && (
            <p className={`formMessage ${status}`}>{message}</p>
          )}
        </form>
      </section>

      <footer className="footer">
        <div className="brandWrapper">
          <a href="#top" className="brand">
            КАЗАНСКИЙ НАЦИОНАЛЬНЫЙ ИССЛЕДОВАТЕЛЬСКИЙ
            <span>ТЕХНОЛОГИЧЕСКИЙ УНИВЕРСИТЕТ</span>
          </a>
        </div>
        <p>
          420015 г. Казань, ул. Карлса Маркса, 68
          <br />
          Электронная почта: <a href="mailto:office@kstu.ru">office@kstu.ru</a>
        </p>
      </footer>

      {isThanksOpen && (
        <div
          className="modalOverlay"
          role="presentation"
          onClick={() => setIsThanksOpen(false)}
        >
          <section
            className="thanksModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="thanks-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modalClose"
              type="button"
              onClick={() => setIsThanksOpen(false)}
              aria-label="Закрыть окно"
            >
              ×
            </button>
            <div className="thanksContent">
              <h2 id="thanks-title">Спасибо!</h2>
              <p>Мы свяжемся с Вами сразу, как наберётся группа</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
