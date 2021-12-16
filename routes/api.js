/** @format */

const router = require("express").Router();
const axios = require("axios");

//getting users repos
router.get("/user/repos/:id", async (req, res) => {
  try {
    const { data: userRepos } = await axios({
      method: "get",
      url: `${process.env.proxyURL}/users/${req.params.id}/repos`,
    });
    const result = userRepos.map((item) => {
      return {
        repoName: item.name,
        author: item.owner.login,
        stars: item.stargazers_count,
        watch: item.watchers_count,
        forks: item.forks,
        desc: item.description,
        updatedAt: item.updated_at,
      };
    });
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//getting users specific repo infomation
router.get("/repo/info", async (req, res) => {
  try {
    const { name, repo } = req.query;
    const { data: userRepoDetails } = await axios({
      method: "get",
      url: `${process.env.proxyURL}/repos/${name}/${repo}`,
    });
    return res.json({
      username: userRepoDetails.owner.login,
      userUrl: userRepoDetails.owner.html_url,
      avatar: userRepoDetails.owner.avatar_url,
      repoName: userRepoDetails.name,
      repoUrl: userRepoDetails.html_url,
      issueNo: userRepoDetails.open_issues,
      branch: userRepoDetails.default_branch,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
