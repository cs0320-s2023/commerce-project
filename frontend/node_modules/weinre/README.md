<!--
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
-->

deprecation notice
------------------

This project is being deprecated. No more work will be done on this project by the Cordova development community. You can continue to use this project and it should work as-is, but issues will not be fixed by the Cordova community.

weinre was built in an age when there were no remote debuggers available for mobile devices. Since then, some platforms are starting to provide remote debugger capabilities, as part of their platform tool set.

1. Android:	[Get Started with Remote Debugging Android Devices](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)
1. iOS:	[Safari Developer Tools overview](https://support.apple.com/guide/safari-developer/safari-developer-tools-overview-dev073038698/mac)
1. Windows:	[Debug Store apps in Visual Studio](https://msdn.microsoft.com/library/hh441472.aspx)

**IMPORTANT NOTE**, some of weinre dependencies have security issues. Use on your own risk.

summary
-------

weinre is WEb INspector REmote.
Pronounced like the word "winery".
Or maybe like the word "weiner".
Who knows, really.

weinre is a debugger for web pages,
like FireBug (for FireFox) and Web Inspector (for WebKit-based browsers),
except it's designed to work remotely, and in particular,
to allow you debug web pages on a mobile device such as a phone.

For more information on weinre:
[http://people.apache.org/~pmuellr/weinre/](http://people.apache.org/~pmuellr/weinre/)

running
-------

For more information about running weinre, you can start the server
and browse the documentation online.

Start the server with the following command

    node weinre

This will start the server, and display a message with the URL to the
server.  Browse to that URL in your web browser, and then click on
'documentation' link, which will display weinre's online documentation.
From there click on the 'Running' page to get more information about
running weinre.

source
------

Follow the link for more information at the top of this file
for instructions on obtaining source.

If you're reading this file as part of the source distribution of weinre,
you will need to run a 'build' before being able to run weinre.  See the
`README.md` file in the root directory of the weinre source distribution
for more information.

