// Component for audio file uploads from user's computer. Other than wav and mp3 causes errors.
const UploadAudioFile = ({
	baseurl,
	setSampleUploaded,
	setEmotions,
	setGender,
	setEmotionsData,
	file,
	setFile,
}) => {
	const handleUploadAudioFile = (e) => {
		e.preventDefault();
		setSampleUploaded(true);
		let fd = new FormData();
		fd.append("file", file);

		fetch(baseurl + "/wav", {
			method: "POST",
			body: fd,
		})
			.then((res) => res.json())
			.then((data) => {
				setEmotionsData(data.values);
				setEmotions(data.values[0]);
				setGender(data.values[1]);
				setSampleUploaded(false);
			})
			.catch((error) => {
				setSampleUploaded(false);
				console.log("error", error);
				alert("error:", error);
			});
	};

	const handlefile = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<div className="div-upload-audio">
			<div>
				<h2 className="div-audioupload-h1">
					Upload mp3 or wav audio samples | max 5MB
				</h2>
			</div>
			<form className="form-upload-audio">
				<label for="input-audioupload">Choose a file </label>
				<input
					onChange={(e) => {
						handlefile(e);
					}}
					id="input-audioupload"
					type="file"
					hidden
				/>
				{file ? (
					<button onClick={(e) => handleUploadAudioFile(e)} type="submit">
						Submit file
					</button>
				) : (
					<button disabled type="submit">
						Submit file
					</button>
				)}
			</form>
		</div>
	);
};

export default UploadAudioFile;
