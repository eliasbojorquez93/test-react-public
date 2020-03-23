import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // could create states for each input
  const [questions, setQuestions] = useState([]);
  const [statusForm, setStatusForm] = useState({
    data: {
      message: 'Complete the form',
      status: 0
    }
  });

  useEffect(() => {

    fetch('https://sn-tests.herokuapp.com/api/questions')
      .then(response => response.json())
      .then(jsonData => setQuestions(jsonData))
  }, []);

  function handleSubmit(event) {
    // I would send data, but the demo does not need it
    const data = new FormData(event.target);
    event.preventDefault();

    fetch('https://sn-tests.herokuapp.com/api/answers/', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(jsonData => setStatusForm(jsonData))
  }

  return (
    <div className="App">
      <nav>
        Test
      </nav>
      <section>
        <h1>Survey Generator</h1>
        {
          !statusForm.data.status?
          <form onSubmit={handleSubmit}>
            <Fields questions={questions} />
            <button>Send</button>
          </form>:
          <p>{ statusForm.data.message }</p>
        }
      </section>
    </div>
  );
}

const Fields = (props) => {

  const questions = props.questions;

  if (questions.length > 0) {
    return questions.map(question => {
      return (
        <div className="form-field" key={question.id}>
          <label htmlFor={question.id}>
            {question.question}
            <input type={question.type} id={question.id} name={question.name} required/>
          </label>
        </div>
      );
    });
  } else {
    return (
      <p>Loading...</p>
    )
  }
}

export default App;
