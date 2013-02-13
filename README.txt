List of members in our group:

Arthur Chin
998362105
c0chinar

Kevin Dial
998273871
c0dialke

Joe Jian
998373451
c0jiansh



Desgin Documentation:

Resource:		GET /clear
Description:	Deletes all topics with their replies on the server.

Resource:		GET /add
Description:	Replaces the current topics with a set of sample topics and replies.

Resource:		GET /get
Description:	Gets a list of topics with their replies from the server.

Resource:		POST /post
Description:	Send the topics and replies represented as a JSON Object to the server

How the server and client communicates:
The client sends all of its information everytime some information gets modified.  For instance, on every new topic, new reply or upvote, the client will send its JSON representation of everything to the server so it can store the updated version.  This ensures that all other clients will get the updated data on the next "/get" call.  However this may causes some concurrency problems; as two clients modify the data at the same time, only the client that submitted last will have its information stored on the database on the server.  We were informed by the professor that only one client will be modifying the server at a time, so this concurrency problem should not occur.

How our site works:
explain what you click on does what
eg) clicking on ^ will upvote the reply, and will increment the topic which will then call sort.
