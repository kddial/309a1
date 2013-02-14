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

URL: http://127.0.0.1:31135/

Desgin Documentation:

REST API:
Resource:		GET /clear
Description:	Deletes all topics with their replies on the server.

Resource:		GET /add
Description:	Replaces the current topics with a set of sample topics and replies.

Resource:		GET /get
Description:	Gets a list of topics with their replies from the server.

Resource:		POST /post
Description:	Send the topics and replies represented as a JSON Object to the server


How the server and client communicates:
The client sends all of its information everytime some information gets modified. For 
instance, on every new topic, new reply or upvote, the client will send its JSON 
representation of everything to the server so it can store the updated version.  This 
ensures that all other clients will get the updated data on the next "/get" call.  
However this may causes some concurrency problems; as two clients modify the data at 
the same time, only the client that submitted last will have its information stored 
on the database on the server.  We were informed by the professor that only one client 
will be modifying the server at a time, so this concurrency problem should not occur.
Note: The database variable on the server is called "topic_list" and contains a list 
of all topics with their replies.


How our site works:
       Voting:  Users may vote on topics and/or replies by clicking the "^" text next 
                to the respective entity. If it is a topic, it will directly increase 
                the topic's vote count by one. If it is a reply that is upvoted, then
                both the topic and reply will increase by one.

    New Topic:  Users may create new topics by clicking the "New Topic" button. This 
                will toggle a textarea that allows users to enter a topic along a 
                second textarea that requires the user to enter a url as well. 

View Comments:  Users may view or hide comments by clicking the "View Comments" text
                under the topic text. This will toggle the replies for the respective
                topic.

        Reply:  Users may comment on topics or replies by clicking the "Reply" text
                under the topic text. This will toggle a textarea that allows users to 
                enter text to respond to a topic.

         Link:  Users may visit the link provided when topics are created by clicking
                the "Link" text. This will load the URL page given by the link.

Notes:
- Link requires a full link, otherwise it will use the current link as it's root, which is a bug.