I've used react-create-app for this project, so it uses default commands:

 Enter this `yarn start` to build project in development mode
 Enter this `yarn test` to run tests.

There is also a couple of things, regarding this task:

1) GitHub search api, allow unathorized users of their api only up to 60 requests per hour. 
To solve this problem, some of endpoints of the api have its own caching mechanism. Unfortunately,
there is no such for repositories endpoint, that is used in this app. Thus, I decided to create simple
caching mechanism, using LocalStorage. I personally would prefer to use proxy server for such means. 
But as it's beyound the scope of this test task requirements, I've decided to use LocalStorage
tools. Using proxy server has it's own shortcomings, as enlargement of time for requests handling.
However, that wouldn't be a drastic change, just up to 50 ms, while we may not count on user's device
to obtain enough space for localStorage to use your app normally and swiftly (smartphones, for example).
Thus, I'm convinced that proxy server would be much better decision for such app.

2) I personally believe, that test should not be written, considering specific methods, classNames, etc.
in your app. Those are too oftenly changing, thus it'll come to simple doublecoding of those changes
in your tests, increasing resourses for developing process. I also believe, that there is no need to test
interaction between redux mechanics, as it's redux developers' work. There is no way, I state this as 
absolute truth, and I'd readily accept aproach, used by the team, but as there weren't any specific 
requirements regarding tests, I allowed myself to do it in my way. 
