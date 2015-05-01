define([
  'jquery',
  'underscore',
  'backbone',
  'views/CourseView',
  'CoursePicker',
  'text!../templates/StudyYearHeaderTemplate.html'
], function ( $, _, Backbone, CourseView, CoursePicker, Template) {

	var MyCourseListView = Backbone.View.extend({
	    el: '#main-content',
	    
	    initialize: function (args) {
	        this.schedule = args.schedule;
	        this.subViews = [];
	    },
	    
	    remove: function () {
	        _.each(this.subViews, function (v) {
	            v.remove();
	        });
	        
	        this.subViews = [];
	        this.remove();
	    },
	    
	    renderYear: function(year) {
	        var activeProgram = _.findWhere(this.schedule, {'programId': CoursePicker.programName});
	        
	        if(!activeProgram)
	            return this;
	        var fragment = document.createDocumentFragment();
	        var self = this;
	        var activeYear;
	        if (year === 4) {
	            activeYear = activeProgram.year4;
	        } else {
	            activeYear = activeProgram.year5;
	        }

	        activeYear.each(function (course) {
	            var courseView = new CourseView({
	                model: course,
	                type: 'myCourse',
	                year: year
	            });
	            self.subViews.push(courseView);
	            fragment.appendChild(courseView.render().el);
	        });
	        return fragment;
	    },

	    renderHeader: function (year) {
	    	var template = _.template(Template);
			this.$el.append(template({
				'studyYear': year
			}));
			return this;
	    },
	        
	        
	    render: function() {
	        this.$el.empty();
	        this.renderHeader(4);
	        this.$el.append('<div class="container" id="year4"></div>');
	        this.$('#header-year-4').append(this.renderYear(4));
	        this.renderHeader(5);
	        this.$el.append('<div class="container" id="year5"></div>');
	        this.$('#header-year-5').append(this.renderYear(5));
	        return this;
	    },
	    
	});


	return MyCourseListView;


});