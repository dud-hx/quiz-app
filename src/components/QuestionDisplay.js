import React from "react";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const QuestionDisplay = (props) => {
	const { questions, answers, options } = props;
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [multiplieQuestions, setMultiplieQuestions] = useState();

	const handleNextClick = () => {
		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < questions?.data?.length) {
			setCurrentQuestion(nextQuestion);
		}
	};
	const handlePrevClick = () => {
		const prevQuestion = currentQuestion - 1;
		if (prevQuestion >= 0) {
			setCurrentQuestion(prevQuestion);
		}
	};
	const handleNextStage = () => {
		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < questions?.data?.length) {
			setCurrentQuestion(nextQuestion);
		}
		const multiQuestions = questions?.data?.filter((item) => {
			const count = answers?.data.filter(
				(answerItem) => item.id === answerItem.questionID,
			);

			return count?.length > 1 && item;
		});
		setMultiplieQuestions(multiQuestions);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col">
					<div className="modal-dialog">
						<div className="modal-content">
							<QuestionCard
								questions={questions}
								currentQuestion={currentQuestion}
								options={options}
								answers={answers}
								multiQuestions={multiplieQuestions}
							/>
						</div>
					</div>
				</div>
				<div className="col-12 text-center">
					{currentQuestion > 0 && (
						<button
							type="button"
							className="btn btn-primary mr-2"
							onClick={handlePrevClick}>
							Previous Question
						</button>
					)}
					{currentQuestion < questions?.data?.length - 2 && (
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={handleNextClick}>
							Next Question
						</button>
					)}
					{currentQuestion === 2 && (
						<button
							type="button"
							className="btn btn-primary mr-2"
							onClick={handleNextStage}>
							Continue to the next Section
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default QuestionDisplay;
