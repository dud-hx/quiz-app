import "./App.css";
import QuestionDisplay from "./components/QuestionDisplay";
import questions from "./data/questions.csv";
import { useEffect, useState } from "react";
import answers from "./data/answers.csv";
import options from "./data/answer_options.csv";
import * as Papa from "papaparse";
function App() {
	const [questionsState, setQuestions] = useState();
	const [answerState, setAnswers] = useState();
	const [optionsState, setOptions] = useState();

	useEffect(() => {
		load(questions, "questions");
		load(answers, "answers");
		load(options, "options");
	}, []);
	const load = (url, type) => {
		fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
				// -- parse csv
				const data = Papa.parse(responseText, { header: true });
				switch (type) {
					case "questions":
						setQuestions(data);
						break;
					case "answers":
						setAnswers(data);
						break;
					case "options":
						setOptions(data);
						break;
					default:
				}
			});
	};

	return (
		<QuestionDisplay
			questions={questionsState}
			options={optionsState}
			answers={answerState}
		/>
	);
}

export default App;
