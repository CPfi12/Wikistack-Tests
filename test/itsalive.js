console.log(':)))');
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

describe('2+2=4',function(){
	xit('equals 4',function(){
		expect(2+2).to.equal(4);
	})
})

describe('SetTimout',function(){
	xit('gives correct amount of time',function(){
		var start = new Date();
		var end;
		setTimeout(function(){ 
			end = new Date();
			expect(end-start).to.be.closeTo(3000,50);
		 }, 3000);
		
	})
})

describe('Spy',function(){
	xit('spies on our function',function(){
		function sth(){
			console.log('hello!');
		}
		var sth = chai.spy.on(sth);
		sth();
		sth();
		sth();
		//var spy = chai.spy(sth);
		
		//ee.on(sth,spy);
		expect(sth).to.have.been.called.exactly(3);
	})
})


