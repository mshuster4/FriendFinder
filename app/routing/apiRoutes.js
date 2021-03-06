var friendsData = require("../data/friends.js");

module.exports = function (app) {
    app.get('/api/survey', function (req, res){
        res.json(friendsData);
    });

    app.post('/api/survey', function(req, res) {

        var newfriend = req.body;

        var newfriendScores = req.body.scores;

        var totalDifferenceArr = [];

        var bestFriendObj = {};

        for (var i = 0; i < newfriendScores.length; i++) {
            
            newfriendScores[i] = parseInt(newfriendScores[i]);

        }

        for (var i = 0; i < friendsData.length; i++) {

            var differenceArr = [];

            var differenceNumber = 0;

            var scoreDifference = 0;

            var compFriend = friendsData[i];

            for (var j = 0; j < compFriend.scores.length; j++) {

                scoreDifference = Math.abs(compFriend.scores[j] - newfriendScores[j]);
                differenceArr.push(scoreDifference);
    
            }

            console.log(differenceArr);

            for (var k = 0; k < differenceArr.length; k++) {

                differenceNumber += differenceArr[k];

            }

            totalDifferenceArr.push(differenceNumber); 

        }

        console.log(totalDifferenceArr);

        var compFriendNum = totalDifferenceArr[0];

        var compFriendIndex = 0;

        for (var i = 1; i < totalDifferenceArr.length; i++) {

            if (totalDifferenceArr[i] < compFriendNum) {

                compFriendNum = totalDifferenceArr[i];
                compFriendIndex = i;

            }
        }

        bestFriendObj = {
            name: friendsData[compFriendIndex].name,
            photo: friendsData[compFriendIndex].photo
        };


        friendsData.push(newfriend);

        res.json(bestFriendObj); 
        

    });

}