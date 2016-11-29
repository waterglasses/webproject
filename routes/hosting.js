var express = require('express');
var router = express.Router();
var  Host = require('../models/Host');

/* GET home page. */
//첫화면
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts){
    if(err){
      return next(err);
    }
    res.render('hosting/index', {posts: posts});
  });
});

//글쓰기
router.get('/new', function(req, res, next) {
  res.render('hosting/edit', {post:{}});
});

//생성
router.post('/', function(req, res, next) {
  //DB에 넣는작업

  var newPost = new Post({
    email: req.body.email,
    password: req.body.password,
    title: req.body.title,
    content: req.body.content,
  });

  newPost.save(function(err, post){
    if(err){
      return next(err);
    }
    res.render('hosting/show', {post: post});
    
  });
});

//조회
router.get('/:id', function(req, res, next){
  Post.findById(req.params.id, function(err,post){
    if(err){
      return next(err);
    }
    post.read = post.read + 1;
    post.save(function(err, post){
      if(err){
        return next(err);
      }
      res.render('hosting/show', {post: post});
    });
  });
});

//수정
router.get('/:id/edit', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post){
    if(err){
      return next(err);
    }
    res.render('hosting/edit', {post: post});
  });
});
router.put('/:id', function(req, res, next) {
  //params로 id받고
  //검색해서(findById)
  //검색결과 post의 passwd 랑 비교해서 맞으면 수정하고 다시저장
  //틀리면 return next();
  Post.findById({_id: req.params.id}, function(err, post){
    if(err){
      return next(err);
    }
    if(post.password === req.body.password){
      post.title = req.body.title;
      post.email = req.body.email;
      post.content = req.body.content;
      post.save(function(err){
      if(err){
          return next(err);
        }
        return res.render('hosting/edit', {post : post});
      });
    }
    
  res.redirect('/hosting');
  });
});

// //삭제
router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err){
    if(err){
      return next(err);
    }
    return res.redirect('/hosting');
    
  });

});

module.exports = router;