import React from "react";

const Options = (props) => {
	const { value, name, id, isMulti } = props;
	console.log(isMulti);
	return (
		<div>
			<label className={"element-animation1 btn btn-lg btn-primary btn-block"}>
				{isMulti ? (
					<input type="checkbox" name={name} value={id} />
				) : (
					<input type="radio" name={name} value={id} />
				)}

				{value}
			</label>
		</div>
	);
};

export default Options;
