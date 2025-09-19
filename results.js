// Functions to calculate and display results
async function calculateResults() {
    const { data, error } = await supabase
        .from('votes')
        .select(`
            candidate_id,
            candidates(name, position),
            position
        `)
        .join('candidates', 'candidates.id', 'votes.candidate_id');
    
    if (error) {
        console.error('Error fetching votes:', error);
        return;
    }
    
    // Process data to calculate percentages
    const resultsByPosition = {};
    
    data.forEach(vote => {
        if (!resultsByPosition[vote.position]) {
            resultsByPosition[vote.position] = {};
        }
        
        if (!resultsByPosition[vote.position][vote.candidate_id]) {
            resultsByPosition[vote.position][vote.candidate_id] = {
                name: vote.candidates.name,
                votes: 0
            };
        }
        
        resultsByPosition[vote.position][vote.candidate_id].votes++;
    });
    
    // Calculate percentages
    for (const position in resultsByPosition) {
        const totalVotes = Object.values(resultsByPosition[position])
            .reduce((sum, candidate) => sum + candidate.votes, 0);
        
        for (const candidateId in resultsByPosition[position]) {
            resultsByPosition[position][candidateId].percentage = 
                Math.round((resultsByPosition[position][candidateId].votes / totalVotes) * 100);
        }
    }
    
    return resultsByPosition;
}
