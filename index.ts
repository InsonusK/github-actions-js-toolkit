import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);
    core.info('===== github.context =====');
    core.info(`github.context.actor: ${github.context.actor}`);
    core.info(`github.context.repo.repo: ${github.context.repo.repo}`);
    core.info(`github.context.repo.owner: ${github.context.repo.owner}`);

    core.info('===== octokit.repos.listReleases =====');
    let repoList = await octokit.repos.listReleases({
        repo: github.context.repo.repo,
        owner: github.context.repo.owner,
        per_page: 10,
        page: 1
    });
    core.info(`Length = ${repoList.data.length}`);
    repoList.data.forEach((element) => {
        core.info(`---------------------------------------------`);
        core.info(`--- element.id:${element.id}`);
        core.info(`--- element.name:${element.name}`);
        core.info(`--- element.tag_name:${element.tag_name}`);
        core.info(`--- element.draft:${element.draft}`);
        core.info(`--- element.prerelease:${element.prerelease}`);
    })

    core.info('===== octokit.actions.listWorkflowRunsForRepo =====');
    let listWorkFlawsRuns = await octokit.actions.listWorkflowRunsForRepo({
        repo: github.context.repo.repo,
        owner: github.context.repo.owner,
        per_page:3,
        page:1
    });
    core.info(`Length = ${listWorkFlawsRuns.data.total_count}`);
    listWorkFlawsRuns.data.workflow_runs.forEach((element) => {
        core.info(`---------------------------------------------`);
        core.info(`--- element.id:${element.id}`);
        core.info(`--- element.run_number:${element.run_number}`);
        core.info(`--- element.head_branch:${element.head_branch}`);
        core.info(`--- element.event:${element.event}`);
        core.info(`--- element.status:${element.status}`);
        core.info(`--- element.workflow_id:${element.workflow_id}`);
        core.info(`--- element.created_at:${element.created_at}`);
        core.info(`--- element.logs_url:${element.logs_url}`);
    })
}

run();
