import React, { useState, useEffect } from "react";
import Options from "./Options";

const QuestionCard = (props) => {
	const { questions, answers, options, currentQuestion } = props;
	const [multiResponse, setMultiResponse] = useState([]);
	const [result, setResult] = useState();
	useEffect(() => {
		setResult();
	}, [currentQuestion]);

	const filteredOptions =
		options &&
		options?.data?.filter(
			(item) => item.questionId === questions?.data[currentQuestion].id,
		);

	const shuffledArray = result?.success
		? filteredOptions
		: filteredOptions?.sort(() => Math.random() - 1.5);

	const handleOnClick = (event) => {
		const { value } = event.target.firstElementChild;
		const findOption = answers?.data?.find((data) => {
			return data.questionID === questions?.data[currentQuestion].id;
		});
		let response;
		if (currentQuestion <= 2) {
			if (findOption.answerID === value) {
				response = { success: true, id: questions?.data[currentQuestion].id };
			} else {
				response = { success: false, id: questions?.data[currentQuestion].id };
			}
			setResult(response);
		} else {
			let resArray = multiResponse.concat(value);
			setMultiResponse(resArray);
		}
	};

	const handleConfirm = () => {
		const findOption = answers?.data?.filter((data) => {
			return data.questionID === questions?.data[currentQuestion].id;
		});
		let response;
		const check = multiResponse.some(
			(item) => !findOption.find((itemSel) => itemSel.answerID === item),
		);
		if (!check) {
			response = { success: true, id: questions?.data[currentQuestion].id };
		} else {
			response = { success: false, id: questions?.data[currentQuestion].id };
		}
		setResult(response);
	};
	const isMulti = currentQuestion > 2;

	return (
		<>
			<div className="modal-header">
				<h3>
					<span className="label label-warning mr-1" id="qid">
						<span> {currentQuestion + 1}. </span>
						{questions?.data[currentQuestion].text}
					</span>
				</h3>
			</div>
			<div className="modal-body">
				<div
					className="quiz"
					id="quiz"
					data-toggle="buttons"
					onClick={handleOnClick}>
					{shuffledArray?.map((answerOption) => {
						return (
							<Options
								name={questions?.data[currentQuestion].id}
								key={answerOption.id}
								value={answerOption.text}
								id={answerOption.id}
								isMulti={isMulti}
							/>
						);
					})}
				</div>
				{isMulti && (
					<div className="text-center">
						<button
							type="button"
							className="btn btn btn-outline-success mr-2"
							onClick={handleConfirm}>
							Confirm
						</button>
					</div>
				)}
			</div>

			{result && (
				<div
					className={`modal-footer ${
						!result.success ? "btn-danger" : "btn-success"
					}`}>
					<span id="answer">{!result?.success ? "INCORRECT" : "CORRECT"}</span>
				</div>
			)}
		</>
	);
};

export default QuestionCard;
