import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);
    core.info(`github.context.actor: ${github.context.actor}`);
    core.info(`github.context.repo.repo: ${github.context.repo.repo}`);
    core.info(`github.context.repo.owner: ${github.context.repo.owner}`);

    let repoList = await octokit.repos.listReleases({
        repo: github.context.repo.repo,
        owner: github.context.repo.owner,
        per_page: 10,
        page: 1
    });
    core.info(`-- octokit.repos.listReleases: length = ${repoList.data.length}`);
    repoList.data.forEach((element) => {
        core.info(`--- element:${element}`);
        core.info(`--- element.id:${element.id}`);
        core.info(`--- element.name:${element.name}`);
        core.info(`--- element.draft:${element.draft}`);
        core.info(`--- element.prerelease:${element.prerelease}`);
    })
}

run();
