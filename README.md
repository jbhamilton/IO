<h1>IO - ultimate javscript form data control and validation</h1>

<p>Web forms make the web an interactive place, and drive business centric applications. Giving your users and
clients an awesome and easy web form expierence shouldn't be difficult, and it doesn't have to be. Using IO you
can easily build efficient self updating forms (think google docs) or simply save resources by limiting data
communication to strictly updated data. Easily provide matching criteria for inputs and auto-toggle error messages
and the ability to ask IO if the form has an error.
You can also prevent major hair loss by having it in your toolkit the next
time your boss asks you to build up a new screen with lots of data pieces.</p>

<h2>Get me the data!</h2>
<p>Get a containers data:</p>

```javascript
var data = IO.get('.data-wrapper');
```

<h2>Get me only the changed data!</h2>
<p>Initialize the container to sets it cache (you can do this multiple times, hence after you have sent a payload
off to the server and you know the changes have been commited to the database)</p>
```javascript
IO.set('.data-wrapper');
```
<p>Get the data that has changed in the form from pageload</p>

```javascript
var data = IO.changes('.data-wrapper');
```

<h2>Tell me when data is changed!</h2>
<p>Provide a callback function to receive changes as they happen</p>

```javascript
IO.subscribe('.data-wrapper',function(data){
   //do something with your data
   //log it for now
   console.log(data);
});
```

<h2>Those darn users always enter such silly things</h2>
<p>Data is important and needs to adhere to some standards, so make it so!</p>
<p>Using the match attribute on an element you can using our standard provided regular expressions or provide your
own. You can also add new conditions to IO for re-use in your application</p>

<b>Start by telling IO that your container is watching for errors</b>
```html
<div class='data-wrapper' ioerrors>...</div>
```

<b>On your input/select/textarea provide a match attribute</b>
```html
<input type='text' name='company' match='^[a-zA-Z\s]+$'>
```

<b>You can use the default provided keywords for your matching</b>

keyword | regexp
------- | ---------
alpha|^[a-zA-Z\s\-]+$
alpha_numeric|^[a-zA-Z\s\-0-9]+$
integer|^[\-0-9]+$
numeric|^[\-0-9\.]+$
all|'[.]*

<b>You can add your own:</b>
```javascript
IO.patterns.your_pattern = 'your regex pattern';
```

<h3>Does your form have an error?</h3>
<p>Before sending data off to the server you might want to check if your form has an error</p>
```javascript
if(IO.hasError('.data-wrapper'))
    console.log('Houston we have an error');
```

<h3>Toggle an error message</h3>
<p>After your form provide an element with the class '.io-error' and it will display when the form does not match
its match condition</p>
```html
<input type='text' name='company' pattern='alpha_numeric'>
<div class='io-error'>Your company name must only be letters and numbers</div>
```
