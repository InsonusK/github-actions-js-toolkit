import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);
    core.info(`github.context.actor: ${github.context.actor}`);

    let repoList = await octokit.repos.listReleases({
        repo: github.context.repo.repo,
        owner: github.context.repo.owner,
        per_page: 10,
        page: 1
    });
    core.warning(`octokit.repos.listReleases:`);
    repoList.data.forEach((element)=>{
        core.info(`--- id:${element.id} name:${element.name}---`);
        core.info(`${element.body}`);
    })
}

run();
