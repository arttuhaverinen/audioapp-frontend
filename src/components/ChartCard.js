import react, { useEffect, useState } from "react";
import Barchart from "./Barchart";

const ChartCard = ({
	header,
	emotionsData,
	ischecked,
	showCharts,
	showLargeCharts,
	chartLabel,
	classes,
}) => {
	const [showPercentages, setShowPercentages] = useState(true);
	const [predictedClass, setPredictedClass] = useState(false);
	const [predictedGender, setPredictedGender] = useState(false);
	const [predictedEmotion, setPredictedEmotion] = useState(false);

	useEffect(() => {
		let highest = -Infinity;
		let correctClass = null;
		if (emotionsData) {
			for (const val in emotionsData) {
				if (emotionsData[val] > highest) {
					highest = emotionsData[val];
					correctClass = val;
				}
			}
			setPredictedClass(correctClass);
		}
	});

	const handleShowPercentages = (e) => {
		if (!emotionsData) return;
		else if (showPercentages) setShowPercentages(false);
		else if (showPercentages == false) setShowPercentages(true);
	};

	return ischecked ? (
		<div className={showLargeCharts ? "card" : "card-small"}>
			<div className="card-header">
				<h3>{header}</h3>
				{predictedClass ? <h3>Predicted class: {predictedClass} </h3> : null}
			</div>
			<div>
				{emotionsData ? (
					<div>
						<Barchart
							data={emotionsData}
							showCharts={showCharts}
							chartLabel={chartLabel}
							classes={classes}
						/>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	) : null;
};

export default ChartCard;
