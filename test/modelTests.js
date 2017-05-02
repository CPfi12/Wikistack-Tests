var Page = require('../models').Page;
var User = require('../models').User;
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);


	describe('Page', function() {
		before(function(done) {
			Page.sync({force: true})
			.then(function(){
				done();
			})
			.catch(function(err){
				done(err)
			})
		});
		describe('General model testing',function(){
			it('Makes a legit page',function(){
			return Page.build({
				title: 'Our page',
				content: 'Really quality info',
				status: 'open',
				tags: 'fantastic,interesting,groundbreaking' 
			}).save().then(function(page){
				expect(page.title).to.equal('Our page');
				expect(page.urlTitle).to.equal('Our_page');
				expect(page.content).to.equal('Really quality info');
				expect(page.status).to.equal('open');
				console.log(page.tags);
				expect(page.tags).to.eql(['fantastic','interesting','groundbreaking']);
				})
			})
		})
		describe('Getter methods', function(){
			it('Returns url with /wiki/', function(){
			Page.build({
				title: 'Page 2',
				content: 'More quality info',
				status: 'open',
				tags: 'nobel prize winning' 
			}).save().then(function(page){
				var url = page.urlTitle;
				expect(page.route).to.equal('/wiki/Page_2');	
				})
			})
		})
		describe('Instance methods',function(){
			it('should come up with similar pages', function(done){
				Page.build({
					title: 'Third page',
					content: 'Really quality info',
					status: 'open',
					tags: 'interesting' 
				})
				.save()
				.then(function(page){
					return page.findSimilar()})
				.then(function(val){console.log(val)
						expect(val[0].title).to.equal('Nur page');
					done();
				})
				.catch(done);
			})
		})
		describe('Class methods',function(){
			it('will return empty array with wrong tag', function(done){
				Page.findByTag('great').then(function(pages){
					expect(pages).to.eql([]);
					done();
				}).catch(done);
			})
			it('returns an array', function(done){
				Page.findByTag('great').then(function(pages){
					expect(pages).to.be.an('array');
					done();
			}).catch(function(err){done(err);});
			})
			it('findByTag returns all row objects with given tag', function(done){
				/*Page.findByTag('fantastic').then(function(pages){
					console.log(pages);
					expect(pages[0].tags).to.eql(['fantastic','interesting','groundbreaking']);
					done();
				}).catch(function(err){done(err);});*/
				Page.findByTag('fantastic').then(function(pages){
					//console.log(pages);
					expect(pages[0].tags).to.eql(['fantastic','interesting','groundbreaking']);
					done();
				}).catch(done);
			})

		})
})
	
