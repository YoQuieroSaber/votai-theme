function postStats(candidatos,userRes,election,preguntas,punParcial) {
	console.log(candidatos,userRes,election,preguntas,punParcial);

	match = {
	    "user_id": 1,
	    "site_id": 1,
	    "site_url": location.host,
	    "election_id": election.election_id,
	    "election_name": election.election_name,
	}
	match.candidates = [];
	match.answers = [];

	for (c in candidatos) {
		match.candidates.push(			{
				"candidate_id":candidatos[punParcial[c][1]]["candidate_id"],
				"percentage": parseInt(punParcial[c][0])
			}
		)
	}
	for (a in userRes) {
		answer = {};

		for (w in preguntas[a]["answers"]) {
			ans = preguntas[a]["answers"][w];
			if (ans.answer_value == userRes[a]) {
				answer = ans;
			}
		}

		match.answers.push(		
			{
				"question_id": preguntas[a]["question_id"],
				"question_text": preguntas[a]["question_text"],
				"answer_id": answer.answer_id,
				"answer_value": answer.answer_value,
				"answer_text": answer.answer_text
			}
		)
	}

	$.ajax({
		type: "POST",
		contentType:"application/json",
		url: "http://stats-vdg.yoquierosaber.org/match/",
		data: JSON.stringify(match),
		headers: { "Authorization": "Token 657269c1c27ba8d9be5ebd01a6078b5413a7e5a5"}
		}
	);
}
